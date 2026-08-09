import { Web3FormsAdapter } from './adapters/web3forms';
import type { ContactService } from './contact.service';

export function createContactService(accessKey: string): ContactService {
  return new Web3FormsAdapter(accessKey);
}
