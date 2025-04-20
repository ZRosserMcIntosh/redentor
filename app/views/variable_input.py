# app/views/variable_input.py

import tkinter as tk
import importlib.util
import os

class VariableInputPanel:
    def __init__(self, parent, controller):
        self.controller = controller
        self.controller.set_variable_panel(self)
        self.frame = tk.Frame(parent, bg="#2e2e2e")
        self.frame.pack(fill=tk.BOTH, expand=True)
        self.inputs = {}

    def load_inputs(self):
        # Clear previous
        for widget in self.frame.winfo_children():
            widget.destroy()
        self.inputs = {}

        selected = self.controller.get_selected_module()
        if not selected:
            return

        path = os.path.join(selected["path"], "schema.py")
        schema = {}
        try:
            spec = importlib.util.spec_from_file_location("schema", path)
            schema_module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(schema_module)
            schema = schema_module.get_schema()
        except Exception as e:
            print(f"[VariableInputPanel] Error loading schema: {e}")
            return

        tk.Label(self.frame, text="Inputs", bg="#2e2e2e", fg="white", font=("Helvetica", 12)).pack(pady=5)

        for var, options in schema.items():
            label = tk.Label(self.frame, text=var, bg="#2e2e2e", fg="white")
            label.pack()
            entry = tk.Entry(self.frame)
            entry.insert(0, str(options.get("default", "")))
            entry.pack()
            self.inputs[var] = entry

        run_button = tk.Button(self.frame, text="Run Module", command=self.run_module)
        run_button.pack(pady=10)

    def run_module(self):
        user_inputs = {k: eval(v.get()) for k, v in self.inputs.items()}  # careful with eval, sanitize in prod
        self.controller.run_selected_module(user_inputs)
