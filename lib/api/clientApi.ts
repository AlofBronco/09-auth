import { NewNote, Note, NoteTag } from '@/types/note';
import { nextServer } from './api';
import { LoginUser, RegisterUser, User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (query: string, page: number, tag?: NoteTag): Promise<FetchNotesResponse> => {
  try {
    const res = await nextServer.get<FetchNotesResponse>('/notes', {
      params: {
        search: query,
        page,
        tag,
      },
    });
    return res.data;
  } catch {
    throw new Error('Error fetching notes');
  }
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  try {
    const res = await nextServer.get<Note>(`/notes/${noteId}`);
    return res.data;
  } catch {
    throw new Error('Error fetching note');
  }
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  try {
    const res = await nextServer.post<Note>('/notes', noteData);
    return res.data;
  } catch {
    throw new Error('Error creating note');
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
    const res = await nextServer.delete<Note>(`/notes/${noteId}`);
    return res.data;
  } catch {
    throw new Error('Error deleting note');
  }
};

export const register = async (data: User): Promise<RegisterUser> => {
  const res = await nextServer.post<RegisterUser>('/auth/register', data);
  return res.data;
};

export const login = async (data: User): Promise<LoginUser> => {
  const res = await nextServer.post<LoginUser>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

interface GetSessionRequest {
  success: boolean;
}

export const getSession = async () => {
  const res = await nextServer.get<GetSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const res = await nextServer.get<LoginUser>('/users/me');
  return res.data;
};

export const updateMe = async (data: RegisterUser) => {
  const res = await nextServer.patch<LoginUser>('/users/me', data);
  return res.data;
};
