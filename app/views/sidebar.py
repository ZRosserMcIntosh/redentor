# app/views/sidebar.py

import tkinter as tk

class Sidebar:
    def __init__(self, parent, controller):
        self.controller = controller
        self.frame = tk.Frame(parent, bg="#1e1e1e")
        self.frame.pack(fill=tk.BOTH, expand=True)

        tk.Label(self.frame, text="Modules", fg="white", bg="#1e1e1e", font=("Helvetica", 14, "bold")).pack(pady=10)

        for module in self.controller.list_modules():
            btn = tk.Button(self.frame, text=module["name"], width=25, command=lambda m=module["id"]: self.select_module(m))
            btn.pack(pady=2)

    def select_module(self, module_id):
        self.controller.select_module(module_id)
        self.controller.notify_selection_changed()
