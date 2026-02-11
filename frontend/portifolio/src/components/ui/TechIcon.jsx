import React from 'react';
import * as Fa from "react-icons/fa";
import * as Si from "react-icons/si";
import * as Di from "react-icons/di";
import * as Bi from "react-icons/bi";
import { FaCode } from "react-icons/fa";

const TechIcon = ({ iconName, className }) => {
    if (!iconName) return <FaCode className={className} />;

    let IconComponent = Fa[iconName];

    if (!IconComponent) IconComponent = Si[iconName];

    if (!IconComponent) IconComponent = Di[iconName];

    if (!IconComponent) IconComponent = Bi[iconName];

    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    console.warn(`Ícone não encontrado: ${iconName}`);
    return <FaCode className={className} />;
};

export default TechIcon;