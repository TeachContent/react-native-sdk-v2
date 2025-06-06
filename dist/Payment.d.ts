import React from "react";
interface PaymentProps {
    collectId: string;
    onSuccess: () => void;
    onFailure: () => void;
    mode: "production" | "sandbox";
}
export declare const Payment: React.FC<PaymentProps>;
export {};
