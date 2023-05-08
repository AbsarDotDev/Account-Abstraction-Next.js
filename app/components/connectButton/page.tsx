'use client'
import { web3ModalConfig } from '@zerodevapp/wagmi/web3modal'
import { 
  SocialWalletConnector,
  GoogleSocialWalletConnector, 
  FacebookSocialWalletConnector, 
  GithubSocialWalletConnector,
  DiscordSocialWalletConnector,
  TwitchSocialWalletConnector,
  TwitterSocialWalletConnector,
} from '@zerodevapp/wagmi'
import {
  EthereumClient,
  w3mProvider,
  w3mConnectors,
} from "@web3modal/ethereum";
import { Web3Modal, Web3Button } from "@web3modal/react";
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'


export default function Web3ModalExample() {
  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet],
    [
      w3mProvider({ projectId: 'a8756cfea5048d5daccf520910d50f42' }),
    ],
  )
  const client = createClient({
    autoConnect: false,
    connectors: [
      new GoogleSocialWalletConnector({options: {
        projectId: '115496b6-1bdc-4bc9-9f72-c71583d0303c',
      }}),
      ...w3mConnectors({
        projectId: '115496b6-1bdc-4bc9-9f72-c71583d0303c',
        version: 2,
        chains,
      }),
    ],
    provider,
    webSocketProvider,
  })
  const ethereumClient = new EthereumClient(client, chains);
  return (
    <>
      <WagmiConfig client={client}>
        <Web3Button />
      </WagmiConfig>
      <Web3Modal
          {...web3ModalConfig}
          projectId={'115496b6-1bdc-4bc9-9f72-c71583d0303c'}
          ethereumClient={ethereumClient}
      />
    </>
  )
}