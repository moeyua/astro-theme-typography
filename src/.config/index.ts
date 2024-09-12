import { configDefault } from "./default";
import { configUser } from "./user";

export const config = {
	...configDefault,
	...configUser,
};
