import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

export const CONTACT_INFO = [
    {
        id: 1,
        icon: FaEnvelope,
        title: "Email",
        description: "Para assuntos profissionais e parcerias.",
        value: "pablo@dev.com",
        link: "mailto:pablo@dev.com",
        isText: false
    },
    {
        id: 2,
        icon: FaWhatsapp,
        title: "WhatsApp",
        description: "Para mensagens rápidas.",
        value: "+55 (11) 99999-9999",
        link: "https://wa.me/5511999999999",
        isText: false
    },
    {
        id: 3,
        icon: FaMapMarkerAlt,
        title: "Localização",
        description: "Disponível para trabalho remoto mundial ou presencial em:",
        value: "São Paulo, Brasil",
        link: null,
        isText: true
    }
];