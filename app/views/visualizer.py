# app/views/visualizer.py

import os
import webbrowser
from datetime import datetime

class VisualizerPanel:
    def __init__(self, parent, controller):
        self.controller = controller
        self.controller.set_visualizer_panel(self)

    def show_plotly_figure(self, fig):
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"outputs/graphs/plot_{timestamp}.html"
            fig.write_html(filename)
            webbrowser.open(f"file://{os.path.abspath(filename)}")
        except Exception as e:
            print(f"[Visualizer] Failed to display Plotly figure: {e}")
