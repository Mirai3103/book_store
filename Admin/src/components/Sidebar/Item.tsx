import React from "react";
import { type IconBaseProps } from "react-icons";
import { Link } from "react-router-dom";
export interface IItemProps extends React.HTMLAttributes<HTMLLIElement> {
    Icon: React.ComponentType<IconBaseProps>;
    label: string;
    to: string;
    rightElement?: React.ReactNode;
}

function Item({ Icon, label, to, rightElement, ...props }: IItemProps) {
    return (
        <li {...props}>
            <Link to={to} className="p-2  rounded-lg w-full flex justify-between items-center">
                <div className="flex items-center ">
                    <Icon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                    <span className="ml-3">{label}</span>
                </div>
                {rightElement && rightElement}
            </Link>
        </li>
    );
}
interface GroupItemProps extends React.HTMLAttributes<HTMLUListElement> {
    label: string;
    children: React.ReactNode;
    withTopSeparator?: boolean;
}
function GroupItem({ label, children, withTopSeparator = false, ...props }: GroupItemProps) {
    return (
        <ul
            className={`space-y-2 flex flex-col menu-lg font-medium text-lg menu menu-horizontal bg-base-200 rounded-box ${
                withTopSeparator ? "border-t border-gray-200 dark:border-gray-700 pt-4 mt-4" : ""
            }`}
            {...props}
        >
            {label && <li className="menu-title ">{label}</li>}
            {children}
        </ul>
    );
}

Item.Group = GroupItem;
export default Item;
