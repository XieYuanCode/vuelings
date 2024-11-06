import { register, resolve } from "@vuelings/core/di";
import { ShellEntryProvider } from "./src/entry.js";
import { TYPES } from "@vuelings/core/model/types.js";

register(TYPES.EntryProvider, ShellEntryProvider)
