import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const BubbleButton = ({ text, className, ...props }: { text: string } & React.ComponentProps<typeof Button>) => {
    return (
        <Button
            className={cn(
                "relative bg-opacity-0 hover:bg-opacity-0 shadow-none bg-[url('/assets/bubble.svg')] bg-contain bg-no-repeat bg-center",
                className
            )}
            {...props}
        >
            {text}
        </Button>
    )
}
