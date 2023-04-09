import Beitrag_add_editing  from "./beitrag_add_editing";
import Beitrag_add_ui from "./beitrag_add_ui";
import { Plugin } from "@ckeditor/ckeditor5-core";

export default class Beitrag_add extends Plugin{
    static get requires() {
        return [ Beitrag_add_editing, Beitrag_add_ui ];
    }
}