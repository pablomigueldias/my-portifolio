import React from 'react';

const StatusPill = ({ published, publishedAt }) => {
    const isScheduled = published && new Date(publishedAt) > new Date();
    const isLive = published && new Date(publishedAt) <= new Date();

    if (isLive) return (
        <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Live
        </span>
    );

    if (isScheduled) return (
        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest">
            Agendado
        </span>
    );

    return (
        <span className="px-3 py-1 bg-muted text-muted-foreground border border-border rounded-full text-[10px] font-bold uppercase tracking-widest">
            Rascunho
        </span>
    );
};

export default StatusPill;