import { ThemeProvider, Flex } from "@aws-amplify/ui-react";
import { Amplify } from 'aws-amplify';
import "@aws-amplify/ui-react/styles.css";
import { studioTheme, UNavBarSide, HeaderStrategy } from "../ui-components";
import { useRouter } from 'next/router';

export default function Strategy() {
    const router = useRouter();

    return (
        <ThemeProvider theme={studioTheme}>
            <Flex direction="row" height="100vh">
                <Flex flex="1" height="100vh">
                    <UNavBarSide overrides={{
                        NavHome: { onClick: () => router.push('/') },
                        NavContent: { onClick: () => router.push('/content') },
                        NavStrategy: { onClick: () => router.push('/strategy') },
                        NavAudience: { onClick: () => router.push('/audience') },
                        NavCustomer: { onClick: () => router.push('/customer') },
                        NavGroup: { onClick: () => router.push('/group') },
                        NavTag: { onClick: () => router.push('/tag') },
                    }} />
                </Flex>
                <Flex direction="column" flex="4">
                    <HeaderStrategy overrides={{
                        StrategyContent: { onClick: () => router.push('/strategy/contentComment') },
                        StrategyGroup: { onClick: () => router.push('/strategy/groupReply') },
                        StrategyMessage: { onClick: () => router.push('/strategy/messageReply') },
                    }} />
                </Flex>
            </Flex>
        </ThemeProvider>
    )
}

