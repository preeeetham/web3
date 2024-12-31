import {
    ActionPostResponse,
    createPostResponse,
    ActionGetResponse,
    ActionPostRequest,
    createActionHeaders,
    ActionError
} from "@solana/actions"
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js"

import { DEFAULT_SOL_ADDRESS, DEFAULT_SOL_AMOUNT } from "./const"

const headers = createActionHeaders();

export const GET = async (req: Request)=> {
    try {
        const requestUrl= new URL(req.url);
        const {toPubkey} = validatedQueryParams(requestUrl);

        const baseHref = new URL(
            `/api/actions/transfer-sol?to=${toPubkey.toBase58()}`,
            requestUrl.origin,
        ).toString();

        const payload: ActionGetResponse = {
            type: 'action',
            title: "transfer native sol",
            icon: new URL("/solana_devs.jpg", requestUrl.origin).toString(),
            description: " ",
            label: "Transfer",
            links: {
                actions:[
                    {
                        label: "Send 1 SOL", // button text
                        href: `${baseHref}&amount=${"1"}`,
                        type: "transaction"
                    },
                      {
                          label: "Send 5 SOL", // button text
                          href: `${baseHref}&amount=${"5"}`,
                          type: "transaction"
                      },
                      {
                          label: "Send 10 SOL", // button text
                          href: `${baseHref}&amount=${"10"}`,
                          type: "transaction"
                      },
                ]
            }
        }

        return Response.json(payload,{
            headers,
        })
    } 
    catch(err){
        console.log(err);
        let actionError : ActionError = {message: "An unknown error occurred"};
        if(typeof err == "string") actionError.message = err;
        return Response.json(actionError,{
            status: 400,
            headers,
        });
    }
};

export const OPTIONS = async()=> Response.json(null, {headers});

export const POST = async(req: Request) => {

};

function validatedQueryParams(requestUrl: URL) {
    let toPubkey: PublicKey = DEFAULT_SOL_ADDRESS;
    let amount: number = DEFAULT_SOL_AMOUNT;

    try{
        if(requestUrl.searchParams.get("to")){
            toPubkey = new PublicKey(requestUrl.searchParams.get("to")!)
        }
    }
    catch(err){
        throw "Invalid input query parameter: to";
    }
    try{
        if(requestUrl.searchParams.get("amount")){
            amount = parseFloat(requestUrl.searchParams.get("amount")!);
        }
        if(amount<=0) throw "amount is too small"; 
    }catch(err){
        throw "invalid input query parameter: amount";
    }
    return {
        amount,
        toPubkey,
    };
}