import { ExpirationCompleteEvent, Publisher, Subjects } from "@axmztickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

}
