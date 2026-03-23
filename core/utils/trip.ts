import { format, formatDistanceStrict } from 'date-fns';
import { es } from 'date-fns/locale';

type TripStatus = 'ok' | 'sos' | 'active' | 'cancelled';

export function mapTripStatus(status: string): TripStatus {
    const map: Record<string, TripStatus> = {
        completed: 'ok',
        sos_triggered: 'sos',
        active: 'active',
        cancelled: 'cancelled',
    };
    return map[status] ?? 'cancelled';
}

export function formatTripDate(dateStr: string): string {
    return format(new Date(dateStr), "d MMM yyyy", { locale: es });
    // → "19 mar"
}

export function formatTripTime(dateStr: string): string {
    return format(new Date(dateStr), "h:mm a", { locale: es });
    // → "4:12 p.m."
}

export function formatDuration(
    seconds: number | null,
    startedAt: string,
    endedAt: string | null,
): string {
    if (seconds) {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        if (mins < 60) return `${mins} min`;
        return `${Math.floor(mins / 60)}h ${mins % 60}m`;
    }

    if (endedAt) {
        return formatDistanceStrict(new Date(startedAt), new Date(endedAt), {
            locale: es,
        });
        // → "23 minutos", "1 hora"
    }

    return 'En curso';
}

export function capitalizeApp(app: string): string {
    const names: Record<string, string> = {
        uber: 'Uber',
        indrive: 'inDrive',
        didi: 'DiDi',
        yango: 'Yango',
        cabify: 'Cabify',
        otro: 'Otro',
    };
    return names[app.toLowerCase()] ?? app;
}