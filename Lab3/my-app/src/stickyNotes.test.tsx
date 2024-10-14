import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the following placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea =
        screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {
        target: { value: "Note content" },
      });
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });

    test('should display all created notes on the page', () => {
        render(<StickyNotes />);
    
        // Simulate creating a new note
        const titleInput = screen.getByPlaceholderText(/Note Title/i);
        const contentInput = screen.getByPlaceholderText(/Note Content/i);
        const submitButton = screen.getByText(/Create Note/i);
    
        fireEvent.change(titleInput, { target: { value: 'Test Note 1' } });
        fireEvent.change(contentInput, { target: { value: 'This is a test note' } });
        fireEvent.click(submitButton);
    
        expect(screen.getByText('Test Note 1')).toBeInTheDocument();
        expect(screen.getByText('This is a test note')).toBeInTheDocument();
      });
    
      test('should update the note object when the note content is edited', () => {
        const noteContent = screen.getByText('test content 1'); // Find the existing content
        
        fireEvent.input(noteContent, { target: { textContent: 'Updated Content' } }); // Simulate updating content
        
        expect(screen.getByText('Updated Content')).toBeInTheDocument(); // Verify the updated content is displayed
      });
    
      test('should delete a note when the delete button is clicked', () => {
        const deleteButtons = screen.getAllByText('x'); // Get all delete buttons
        
        fireEvent.click(deleteButtons[0]); // Simulate clicking the first delete button
        
        expect(screen.queryByText('Note to Delete')).not.toBeInTheDocument(); // Verify the note is removed
      });
    
      test('should handle 0 sticky notes properly', () => {
        render(<StickyNotes />);
    
        // The initial state should be empty notes
        expect(screen.queryByText(/No Notes/i)).toBeNull();
      });
    
      test('should ensure the form input and displayed note text match', () => {
        render(<StickyNotes />);
    
        const titleInput = screen.getByPlaceholderText(/Note Title/i);
        const contentInput = screen.getByPlaceholderText(/Note Content/i);
        const submitButton = screen.getByText(/Create Note/i);
    
        fireEvent.change(titleInput, { target: { value: 'Form Note' } });
        fireEvent.change(contentInput, { target: { value: 'Form Content' } });
        fireEvent.click(submitButton);
    
        expect(screen.getByText('Form Note')).toBeInTheDocument();
        expect(screen.getByText('Form Content')).toBeInTheDocument();
      });
   });
   
