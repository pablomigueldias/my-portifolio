import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

export const CONTACT_INFO = [
    {
        id: 1,
        icon: FaEnvelope,
        title: "Email",
        description: "Para assuntos profissionais e parcerias.",
        value: "contato@pabloortiz.dev",
        link: "mailto:contato@pabloortiz.dev",
        isText: false
    },
    {
        id: 2,
        icon: FaWhatsapp,
        title: "WhatsApp",
        description: "Para mensagens rápidas.",
        value: "+55 (11) 92066-9859",
        link: "https://wa.me/5511920669859",
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