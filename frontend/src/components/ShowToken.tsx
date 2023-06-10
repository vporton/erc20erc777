import { useAccount, useBalance } from "wagmi";

export default function ShowToken(props: {wrapped: `0x${string}`, wrapper: `0x${string}`}) {
    const { address } = useAccount();
    const balanceWrapped = useBalance({
        address,
        token: props.wrapped,
    })
    return (
        <p>
            {balanceWrapped.data?.symbol} {balanceWrapped.data?.formatted}
        </p>
    );
}