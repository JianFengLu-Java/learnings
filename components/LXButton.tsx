import {extendVariants} from "@heroui/system";
import {Button} from "@heroui/button";

export const LXButton = extendVariants(Button,{
    variants: {
        color:{
            yellow:'bg-yellow-300 text-black/70 font-bold'
        },
        isBordered: {
            true:"border border-yellow-500 shadow-xs"
        },

    },
    defaultVariants: {
        color:'yellow'
    }
})