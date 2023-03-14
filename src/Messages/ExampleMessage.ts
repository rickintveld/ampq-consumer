import { Serializable } from "ts-jackson";
import ExamplePayload from "../Payloads/ExamplePayload";
import Message from "./Message";

@Serializable()
export default class ExampleMessage extends Message<ExamplePayload> {}
