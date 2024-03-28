import math
from tkinter import *


def clear_root(root):
    """Clear all widgets from a Tkinter root."""
    for widget in root.winfo_children():
        widget.destroy()


def rectangle(width, height, root):
    """Display information about a rectangle on a Tkinter window.
    This function calculates and displays either the area and pattern of the rectangle
    or the perimeter and pattern based on the width and height provided. """
   
    clear_root(root)

    scrollbar = Scrollbar(root)
    scrollbar.pack(side=RIGHT, fill=Y)

    print_rows = Listbox(root, yscrollcommand=scrollbar.set, justify=CENTER)
    print_rows.insert(END, "")   # empty line

    if width == height or abs(width - height) > 5:
        # Area
        Label(root, text=f"Rectangle Area: {width*height} \n").pack(pady=5)
        for i in range(height): 
            print_rows.insert(END, "  *  "*width)
    else:
        # Perimeter
        Label(root, text=f"Rectangle Perimeter: {2*(width+height)} \n").pack(pady=5)
        print_rows.insert(END, " * "*width)
        for _ in range(height-2):
            if width == 1:
                print_rows.insert(END, f"*")
            else:    
                print_rows.insert(END, f"*"+(width-2)*"    "+"*")
        if height != 1:
            print_rows.insert(END, " * "*width)
          
    print_rows.pack(side=LEFT, fill=BOTH, expand=True)
    scrollbar.config(command=print_rows.yview)


def triangular_perimeter(width, height, root):
    """Calculate and display the perimeter of a triangular shape on a Tkinter window.
    This function calculates and displays the perimeter of a triangular shape 
    based on the width and height provided."""
    
    clear_root(root)

    # Formula for calculating the perimeter of an isosceles triangle according
    # to the Pythagorean theorem when the height and base are known
    result = (math.sqrt((width / 2) ** 2 + height ** 2)) * 2 + width   
    
    Label(root, text=f"Triangular Perimeter: {result}").pack()


def triangular_print(width, height, root):
    """Display a triangular pattern on a Tkinter window.
    This function displays a triangular pattern on a Tkinter window 
    based on the width and height provided."""
    
    clear_root(root)
     
    if width % 2 == 0 or height * 2 < width:
        Label(root, text="The width should be an even number \n and  the height should be multiplied by 2 less than the width").pack()
        return 

    Label(root, text="Triangular Print:\n").pack(pady=5)

    scrollbar = Scrollbar(root)
    scrollbar.pack(side=RIGHT, fill=Y)
    print_rows = Listbox(root, yscrollcommand=scrollbar.set, justify=CENTER)  
    print_rows.insert(END, "")   # empty line
    print_rows.pack(side=LEFT, fill=BOTH, expand=True)
    scrollbar.config(command=print_rows.yview)

    # handles edge case width = 1
    if width == 1:   
        for i in range(height):
            print_rows.insert(END, "*") 
        return

    # handles edge case width = 3
    if width == 3:
        for i in range(height):
            multiplayer = 3 if i >= height/2 else 1
            print_rows.insert(END, "*"*multiplayer)
        return

    print_rows.insert(END, "*")  # first row

    sum_of_odd = int(width/2)-1
    module = int((height-2) % sum_of_odd)

    for i in range(module):
        print_rows.insert(END, "***")

    for i in range(3, width, 2):
        for j in range(int((height-2)/sum_of_odd)):
            print_rows.insert(END, "*" * i)

    print_rows.insert(END, "*" * width)  # last row
