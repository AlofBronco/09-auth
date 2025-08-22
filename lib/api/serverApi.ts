import { cookies } from 'next/headers';
import { nextServer } from './api';
import { LoginUser } from '@/types/user';
import { Note, NoteTag } from '@/types/note';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<LoginUser> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async (query: string, page: number, tag?: NoteTag): Promise<FetchNotesResponse> => {
  try {
    const cookieStore = await cookies();
    const res = await nextServer.get<FetchNotesResponse>('/notes', {
      params: {
        search: query,
        page,
        tag,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch {
    throw new Error('Error fetching notes');
  }
};
