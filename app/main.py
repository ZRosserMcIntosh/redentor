# app/main.py

import tkinter as tk
from app.layout.header import create_header
from layout.footer import create_footer
from app.views.sidebar import Sidebar
from app.views.variable_input import VariableInputPanel
from app.views.visualizer import VisualizerPanel
from controllers.module_controller import ModuleController

def launch_app():
    root = tk.Tk()
    root.title("Boundless Dashboard")
    root.geometry("2560x1440")

    # Controller handles module logic
    controller = ModuleController()

    # Header
    create_header(root)

    # Layout containers
    sidebar_frame = tk.Frame(root, width=320, bg="#1e1e1e")
    variable_frame = tk.Frame(root, width=320, bg="#2e2e2e")
    visualizer_frame = tk.Frame(root, width=960, bg="#ffffff")

    sidebar_frame.pack(side=tk.LEFT, fill=tk.Y)
    variable_frame.pack(side=tk.LEFT, fill=tk.Y)
    visualizer_frame.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)

    # Footer
    create_footer(root)

    # Inject components
    Sidebar(sidebar_frame, controller)
    VariableInputPanel(variable_frame, controller)
    VisualizerPanel(visualizer_frame, controller)

    root.mainloop()

if __name__ == "__main__":
    launch_app()

