import { z } from "zod";
import { assembleModel } from "./_model-helpers.js";

const UserSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string()
}).refine(
    ({ phone }) => phone.split("").every(char => Number.parseInt(char, 10)) && phone.length === 10,
    { message: "Incorrect format for phone number of new user" }
);

const AbstractUser = (data) => {
    UserSchema.parse(data);
    return {
        id: data.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone
    };
};

export const User = assembleModel("users", AbstractUser);
export const Users = assembleModel("users", AbstractUser, true);
export default [User, Users];