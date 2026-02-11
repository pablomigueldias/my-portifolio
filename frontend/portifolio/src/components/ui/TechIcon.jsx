import React from 'react';
// Importando todos os ícones (Isso permite que você use qualquer nome string do banco)
import * as Fa from "react-icons/fa";
import * as Si from "react-icons/si";
import * as Di from "react-icons/di";
import * as Bi from "react-icons/bi";
import { FaCode } from "react-icons/fa";

const TechIcon = ({ iconName, className }) => {
    if (!iconName) return <FaCode className={className} />;

    // 1. Tenta encontrar na biblioteca FontAwesome (Ex: FaReact, FaPython)
    let IconComponent = Fa[iconName];

    // 2. Se não achar, tenta na SimpleIcons (Ex: SiNextdotjs, SiTailwindcss)
    if (!IconComponent) IconComponent = Si[iconName];

    // 3. Se não achar, tenta na Devicons (Ex: DiMongodb)
    if (!IconComponent) IconComponent = Di[iconName];

    // 4. Se não achar, tenta na BoxIcons (Ex: BiData)
    if (!IconComponent) IconComponent = Bi[iconName];

    // Se achou, renderiza o componente
    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    // Fallback: Se digitou errado ou não existe, mostra um ícone genérico
    console.warn(`Ícone não encontrado: ${iconName}`);
    return <FaCode className={className} />;
};

export default TechIcon;