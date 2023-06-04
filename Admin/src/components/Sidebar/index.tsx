import React from "react";
import Item, { IItemProps } from "./Item";
import { AiFillDashboard } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";

export interface ISidebarGroup {
    label?: string;
    groupItems: IItemProps[];
}

interface ISidebarProps {
    sidebarGroups: ISidebarGroup[];
}

export default function Sidebar({ sidebarGroups }: ISidebarProps) {
    return (
        <aside
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-base-200 border-r border-gray-200 sm:translate-x-0  dark:border-gray-700"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 pb-4 overflow-y-auto bg-base-200">
                {sidebarGroups.map((group, index) => (
                    <Item.Group key={index} label={group.label || ""} withTopSeparator={index !== 0}>
                        {group.groupItems.map((item, index) => (
                            <Item key={index} {...item} />
                        ))}
                    </Item.Group>
                ))}
            </div>
        </aside>
    );
}
