# controllers/module_controller.py

import json
import os
import importlib.util
from typing import Optional


# Path to the module metadata JSON file
MODULES_JSON_PATH = os.path.join("data", "modules.json")


class ModuleController:
    def __init__(self):
        self.modules = self._load_modules()
        self.selected_module_id: Optional[str] = None
        self.variable_panel = None
        self.visualizer_panel = None

    def _load_modules(self):
        """Load module metadata from the JSON file."""
        try:
            with open(MODULES_JSON_PATH, "r") as file:
                data = json.load(file)
                return {module["id"]: module for module in data.get("modules", [])}
        except Exception as e:
            print(f"[ModuleController] Failed to load modules: {e}")
            return {}

    def list_modules(self):
        """Return basic metadata (id + name) for all modules."""
        return [{"id": mid, "name": mod["name"]} for mid, mod in self.modules.items()]

    def select_module(self, module_id: str):
        """Set the currently selected module by ID."""
        if module_id in self.modules:
            self.selected_module_id = module_id
            print(f"[ModuleController] Module selected: {module_id}")
        else:
            print(f"[ModuleController] Invalid module ID: {module_id}")

    def get_selected_module(self):
        """Get full metadata of the selected module."""
        if self.selected_module_id:
            return self.modules.get(self.selected_module_id, None)
        return None

    def get_module_description(self, module_id):
        mod = self.modules.get(module_id)
        return mod.get("description") if mod else None

    def get_module_path(self, module_id):
        mod = self.modules.get(module_id)
        return mod.get("path") if mod else None

    def search_modules(self, query: str):
        """Search modules by ID, name, or tags."""
        query = query.lower()
        results = []
        for mod in self.modules.values():
            if (query in mod["id"].lower() or
                query in mod["name"].lower() or
                any(query in tag.lower() for tag in mod.get("tags", []))):
                results.append(mod)
        return results

    # 👇 These are used to connect to GUI panels

    def set_variable_panel(self, panel):
        self.variable_panel = panel

    def set_visualizer_panel(self, panel):
        self.visualizer_panel = panel

    def notify_selection_changed(self):
        """Notify the variable panel to reload inputs when module is selected."""
        if self.variable_panel:
            self.variable_panel.load_inputs()

    def run_selected_module(self, user_inputs: dict):
        """Run selected module’s logic and send result to the visualizer."""
        selected = self.get_selected_module()
        if not selected:
            print("[ModuleController] No module selected.")
            return

        try:
            # Load run.py
            run_path = os.path.join(selected["path"], "run.py")
            run_spec = importlib.util.spec_from_file_location("run", run_path)
            run_module = importlib.util.module_from_spec(run_spec)
            run_spec.loader.exec_module(run_module)
            output_data = run_module.run_module(**user_inputs)

            # Load visualize.py
            vis_path = os.path.join(selected["path"], "visualize.py")
            vis_spec = importlib.util.spec_from_file_location("visualize", vis_path)
            vis_module = importlib.util.module_from_spec(vis_spec)
            vis_spec.loader.exec_module(vis_module)
            fig = vis_module.visualize(output_data)

            # Send Plotly figure to visualizer panel
            if self.visualizer_panel and hasattr(self.visualizer_panel, "show_plotly_figure"):
                self.visualizer_panel.show_plotly_figure(fig)

        except Exception as e:
            print(f"[ModuleController] Error running module: {e}")
