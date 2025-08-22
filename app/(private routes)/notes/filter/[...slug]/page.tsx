import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchServerNotes as fetchNotes } from '@/lib/api/serverApi';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Filter: ${slug[0]} | NoteHub`,
    description: `Filtered notes with ${slug[0]} tag`,
    openGraph: {
      title: `Filter: ${slug[0]} | NoteHub`,
      description: `Filtered notes with ${slug[0]} tag`,
      url: `https://09-auth-three-lake.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Filter: ${slug[0]} | NoteHub`,
        },
      ],
    },
  };
}

const NotesPage = async ({ params }: NotesPageProps) => {
  const { slug } = await params;
  const queryClient = new QueryClient();

  const query = '';
  const currentPage = 1;

  const tag = slug[0] === 'All' ? undefined : (slug[0] as NoteTag);

  const response = await fetchNotes(query, currentPage, tag);

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, currentPage, tag],
    queryFn: () => fetchNotes(query, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={response} tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
