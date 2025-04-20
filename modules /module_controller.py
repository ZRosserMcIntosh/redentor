# controllers/module_controller.py

import json
import os

MODULES_JSON_PATH = os.path.join("data", "modules.json")

class ModuleController:
    def __init__(self):
        self.modules = self._load_modules()
        self.selected_module_id = None

    def _load_modules(self):
        try:
            with open(MODULES_JSON_PATH, "r") as file:
                data = json.load(file)
                return {module["id"]: module for module in data.get("modules", [])}
        except Exception as e:
            print(f"[ModuleController] Failed to load modules: {e}")
            return {}

    def list_modules(self):
        """Returns a list of module metadata (id and name) for the sidebar."""
        return [{"id": mid, "name": mod["name"]} for mid, mod in self.modules.items()]

    def select_module(self, module_id):
        """Sets the currently selected module."""
        if module_id in self.modules:
            self.selected_module_id = module_id
            print(f"[ModuleController] Module selected: {module_id}")
        else:
            print(f"[ModuleController] Invalid module ID: {module_id}")

    def get_selected_module(self):
        """Returns full metadata of the currently selected module."""
        if self.selected_module_id:
            return self.modules.get(self.selected_module_id, None)
        return None

    def get_module_description(self, module_id):
        mod = self.modules.get(module_id)
        return mod.get("description") if mod else None

    def get_module_path(self, module_id):
        mod = self.modules.get(module_id)
        return mod.get("path") if mod else None

    def search_modules(self, query):
        """Search modules by name, id, or tags."""
        query = query.lower()
        results = []
        for mod in self.modules.values():
            if (query in mod["id"].lower() or
                query in mod["name"].lower() or
                any(query in tag.lower() for tag in mod.get("tags", []))):
                results.append(mod)
        return results
