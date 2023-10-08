import { Stack } from "../widget/mui";
import CoinExchangeEditor from "./CoinExchangeEditor";

export default function CoinExchangeManager() {

    return (
        <Stack p={2}>
            Coin exchange manager

            <CoinExchangeEditor/>
        </Stack>
    )
}