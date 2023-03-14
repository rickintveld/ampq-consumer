import { JsonProperty, Serializable } from "ts-jackson";

@Serializable()
export default class Message<T> {
  @JsonProperty("action")
  readonly action?: string;

  @JsonProperty("payload")
  readonly payload?: T;
}
