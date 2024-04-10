import type { RequestHandler } from './$types';
import { Prisma as prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({url}) => {
    const filter = Number(url.searchParams.get('f') ?? '0');
	const count = Number(url.searchParams.get('c') ?? '10');
	const page = Number(url.searchParams.get('p') ?? '1');
	const query = url.searchParams.get('q')
    console.log('GET /api/product', { filter, count, page, query });
    try {
        const data = await prisma.product.findMany({
            take: count,
            skip: (page - 1) * count,
            where: {
                OR: [
                    { name: { contains: query } },
                    { id: { contains: query } },
                    { versions: { some: { id: { contains: query } } } },
                    { client: { name: { contains: query } } }
                ]
            },
            include: {
                client: true,
                versions: true
            }
        });
        return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
            
        });
    }
    return new Response();
};