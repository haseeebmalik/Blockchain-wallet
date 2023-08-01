import axios from 'axios';
import { goerli,sepolia } from '../utils/chains';




export class TransactionService {

  static API_URL =  'https://deep-index.moralis.io/api/v2';
  static API_KEY =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjMwZWIzZjYwLTEwZDktNDRhYS1iYWJkLTIwZjY4OGUxZTdkMiIsIm9yZ0lkIjoiMzIyNDQ4IiwidXNlcklkIjoiMzMxNDk3IiwidHlwZUlkIjoiMGVjMDBhYTgtODM1ZC00YjBkLTgxZmEtMjFjY2M3OWJkMzIyIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODkxNjY0NzksImV4cCI6NDg0NDkyNjQ3OX0.Fq3Laz3bBbKjdzbQTGtc228ArNfj3foYm4ZvVqUOmWM';

  static async getTransactions(address) {
    const options = {
        method: 'GET',
        url: `${TransactionService.API_URL}/${address}`,
        params: {chain: sepolia.name.toLowerCase()},
        headers: {accept: 'application/json', 'X-API-Key': TransactionService.API_KEY}
      };

    const response = await axios.request(options);
    return response;
  }

}