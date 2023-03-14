import { JsonProperty, Serializable } from "ts-jackson";

@Serializable()
export default class ExamplePayload {
  @JsonProperty("title")
  readonly title?: string;

  @JsonProperty("content")
  readonly content?: string;
}
