from tkinter import *
from functions import rectangle, triangular_perimeter, triangular_print


def check_integers(width, height, func_name, current_root):
    """Check if the provided inputs are positive integers and call the corresponding function."""

    try:
        if int(width.get()) <= 0 or int(height.get()) <= 0:
            raise ValueError
        # check for the function name  
        elif func_name == "triangular_Perimeter":
            triangular_perimeter(int(width.get()), int(height.get()), current_root)
        elif func_name == "triangular_print":
            triangular_print(int(width.get()), int(height.get()), current_root)
        elif func_name == "rectangle":
            rectangle(int(width.get()), int(height.get()), current_root)

        global maim_button_display
        maim_button_display.pack(pady=3)  # show the main menu button

    except ValueError:
        Label(current_root, text=f"Please enter positive integer numbers of type int").pack()


def form_input(title):
    """Create a form for dimensions of shapes and buttons to call the corresponding function."""

    global maim_button_display  
    maim_button_display.pack_forget()   # hide the main menu button

    global form_frame
    if form_frame:
        form_frame.destroy()  # Destroy existing form_frame if it exists
    form_frame = Frame(root) 
    form_frame.pack(side="top", fill="both", expand=True)   # display the new one

    # input fields  
    Label(form_frame, text="width:").pack()
    width = Entry(form_frame)
    width.pack()

    Label(form_frame, text="height:").pack()
    height = Entry(form_frame)
    height.pack()
    
    # buttons
    if title == "triangular":
        Button(form_frame, text="Perimeter", command=lambda: check_integers(width, height, "triangular_Perimeter", form_frame)).pack(pady=7)
        Button(form_frame, text="print", command=lambda: check_integers(width, height, "triangular_print", form_frame)).pack(pady=3)
    else:
        Button(form_frame, text="rectangle", command=lambda: check_integers(width, height, "rectangle", form_frame)).pack(pady=7)


def main_menu(root):
    """Create the main menu with 3 options: Rectangle, Triangular, and Close."""

    main_frame = Frame(root)
    main_frame.pack(pady=10)

    menu_bar = Menu(main_frame)
    menu_button = Menubutton(main_frame, text="Menu", menu=menu_bar, direction="below", relief="raised")    
   
    menu = Menu(menu_button, tearoff=0)
    menu.add_command(label="Rectangle", command=lambda: form_input("rectangle"))
    menu.add_separator()
    menu.add_command(label="Triangular", command=lambda: form_input("triangular"))
    menu.add_separator()
    menu.add_command(label="Close", command=root.destroy)
    
    menu_button.configure(menu=menu)
    return menu_button


if __name__ == '__main__':

    root = Tk()   # create a tkinter window
    root.geometry("600x400")

    maim_button_display = main_menu(root)   
    maim_button_display.pack(pady=3)

    form_frame = None

    Label(root, text="- Twitter Towers -  ", font=("Arial", 16, )).pack(pady=5)

    root.mainloop()   # run the user window in loop
