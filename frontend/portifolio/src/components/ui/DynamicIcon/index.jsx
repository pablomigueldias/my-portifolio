import React from 'react';
import { IconLibraries } from './iconMap';

const DynamicIcon = ({ iconName, className = "w-6 h-6", ...props }) => {
    const libPrefix = iconName.substring(0, 2);
    const Library = IconLibraries[libPrefix];

    if (!Library || !Library[iconName]) {
        console.warn(`[Tech Lead Warning]: Ícone "${iconName}" não encontrado na lib "${libPrefix}".`);
        return <div className="w-6 h-6 bg-surface rounded-full animate-pulse" />;
    }

    const IconComponent = Library[iconName];

    return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;