import * as borrowRequest from "./borrow-request/structs";
import * as frozenPub from "./frozen-pub/structs";
import * as obRequest from "./ob-request/structs";
import * as request from "./request/structs";
import * as transferRequest from "./transfer-request/structs";
import * as withdrawRequest from "./withdraw-request/structs";
import {StructClassLoader} from "../../../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(obRequest.OB_REQUEST);
loader.register(request.Policy);
loader.register(request.PolicyCap);
loader.register(request.RequestBody);
loader.register(request.RuleStateDfKey);
loader.register(request.WithNft);
loader.register(borrowRequest.Witness);
loader.register(borrowRequest.BORROW_REQ);
loader.register(borrowRequest.BorrowRequest);
loader.register(borrowRequest.ReturnPromise);
loader.register(withdrawRequest.Witness);
loader.register(withdrawRequest.WITHDRAW_REQ);
loader.register(withdrawRequest.WithdrawRequest);
loader.register(transferRequest.TransferRequest);
loader.register(transferRequest.Witness);
loader.register(transferRequest.BalanceAccessCap);
loader.register(transferRequest.BalanceDfKey);
loader.register(transferRequest.OBCustomRulesDfKey);
loader.register(frozenPub.FROZEN_PUB);
 }
