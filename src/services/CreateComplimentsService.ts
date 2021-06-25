import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { MailSenderService } from "./MailSenderService";

interface IComplimentResquest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimenteService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentResquest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);
        const mailSender = new MailSenderService();

        if(user_sender === user_receiver) {
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);

        if(!userReceiverExists) {
            throw new Error("User Receiver does not exists!");
        }

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender, 
            message
        })

        await complimentsRepositories.save(compliment);

        mailSender.send({
            from: 'nlwvaloriza@test.com',
            to: userReceiverExists.email,
            subject: `You've received a compliment!`,
            content: `This is your compliment: ${message}`
        })
        
        return compliment;

    }
}

export { CreateComplimenteService };