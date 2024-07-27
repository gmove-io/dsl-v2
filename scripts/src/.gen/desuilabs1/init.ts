import * as dlab from "./dlab/structs";
import {StructClassLoader} from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) { loader.register(dlab.Witness);
loader.register(dlab.DLAB);
loader.register(dlab.Dlab);
 }
