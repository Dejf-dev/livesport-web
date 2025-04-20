import {ErrorMessage} from "@/components/ErrorMessage";

export default function Custom500() {
    return (
        <ErrorMessage mainText="500 - Server error"
                      descText="Something went wrong. Please try again later."
                      is404={false}
                      buttonText="Reload" />
    );
}