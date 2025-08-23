import { NewNote, Note, NoteTag } from '@/types/note';
import { nextServer } from './api';
import { LoginRequest, RegisterRequest, User } from '@/types/user';

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

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
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
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

interface UpdateRequest {
  username: string;
}

export const updateMe = async (data: UpdateRequest) => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};
