import { Alert, AlertDescription } from "@/components/ui/alert"
import { Result } from "@/lib/types"
import { RocketIcon } from "@radix-ui/react-icons"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

export function PopUp({ result }: { result: Result }) {
    return (
        <Alert className="p-4">
            {result.success ? <RocketIcon className="h-4 w-4" /> : <ExclamationTriangleIcon className="h-4 w-4" />}
            <AlertDescription>
                {result.message}
            </AlertDescription>
        </Alert>
    )
}