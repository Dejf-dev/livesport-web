
import {ErrorMessage} from "@/components/ErrorMessage";

export default function Custom404() {
    return (
        <ErrorMessage mainText="404 - Page not found"
                      descText="We're sorry, but the requested page does not exist."
                      is404={true}
                      buttonText="Back to main page" />
    );
}
