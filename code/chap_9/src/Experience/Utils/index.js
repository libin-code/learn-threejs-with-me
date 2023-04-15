import EventEmitter from "eventemitter3";
import Debug from "./Debug";
import Resources from "./Resources";
import Sizes from "./Sizes";
import Time from "./Time";

const EE = new EventEmitter();

export { Debug, EE, Resources, Sizes, Time };
