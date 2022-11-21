import { AptosClient, HexString } from 'aptos';
import { NODE_URL } from 'utils/config';

export const aptosClient = new AptosClient(NODE_URL);

export const getBalance = async (address: string, resourceType: string): Promise<string> => {
  try {
    const result: any = await aptosClient.getAccountResource(
      new HexString(address),
      `0x1::coin::CoinStore<${resourceType}>`,
    );
    return result.data.coin.value;
  } catch (err: any) {
    console.log(err);
    return '0';
  }
};
