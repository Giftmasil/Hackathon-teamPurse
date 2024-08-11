import boto3
from botocore.config import Config
import json
import os
from dotenv import load_dotenv
import plotly.graph_objects as go
import numpy as np

load_dotenv()

# Setup Amazon Bedrock client
bedrock = boto3.client(
    service_name='bedrock',
    region_name=os.getenv('AWS_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    config=Config(
        retries={'max_attempts': 10, 'mode': 'standard'}
    )
)

def get_llama_response(prompt):
    try:
        body = json.dumps({
            "prompt": prompt,
            "max_tokens": 1024,
            "temperature": 0.7,
            "top_p": 0.9,
        })
        
        response = bedrock.invoke_model(
            body=body,
            modelId=os.getenv('LLAMA_MODEL_ID'),
            accept="application/json",
            contentType="application/json"
        )
        
        response_body = json.loads(response.get("body").read())
        return response_body.get("generation")
    except Exception as e:
        print(f"Error calling Bedrock: {str(e)}")
        # Fallback to mock response for testing
        return "Error: Unable to generate response. Please try again."

def calculate_population_growth(initial_population, growth_rate, years):
    return initial_population * (1 + growth_rate) ** years

def generate_3d_city_model(land_area, zoning, existing_infrastructure):
    # Define building types and their properties
    building_types = {
        'Residential': {'color': 'lightblue', 'height_range': (10, 50)},
        'Commercial': {'color': 'orange', 'height_range': (20, 100)},
        'Industrial': {'color': 'gray', 'height_range': (15, 80)},
        'Mixed-Use': {'color': 'purple', 'height_range': (15, 120)}
    }

    # Generate buildings based on zoning
    num_buildings = int(land_area * 15)  # Increase building density
    building_type = building_types[zoning]
    
    # Generate random building properties
    x = np.random.rand(num_buildings) * np.sqrt(land_area)
    y = np.random.rand(num_buildings) * np.sqrt(land_area)
    heights = np.random.randint(building_type['height_range'][0], building_type['height_range'][1], num_buildings)
    
    # Create 3D scatter plot for buildings
    trace_buildings = go.Scatter3d(
        x=x, y=y, z=heights/2,  # Divide height by 2 to set the marker at the middle of the building
        mode='markers',
        marker=dict(
            size=heights/3,  # Adjust marker size based on building height
            color=building_type['color'],
            opacity=0.8,
            symbol='square',
        ),
        name='Buildings'
    )

    # Generate roads
    num_roads = int(np.sqrt(land_area) * 2)
    road_x = np.linspace(0, np.sqrt(land_area), num_roads)
    road_y = np.linspace(0, np.sqrt(land_area), num_roads)
    
    traces_roads = []
    for i in range(num_roads):
        traces_roads.append(go.Scatter3d(
            x=[road_x[i], road_x[i]], y=[0, np.sqrt(land_area)], z=[0, 0],
            mode='lines',
            line=dict(color='gray', width=2),
            name='Road' if i == 0 else None,
            showlegend=True if i == 0 else False
        ))
        traces_roads.append(go.Scatter3d(
            x=[0, np.sqrt(land_area)], y=[road_y[i], road_y[i]], z=[0, 0],
            mode='lines',
            line=dict(color='gray', width=2),
            showlegend=False
        ))

    # Create layout
    layout = go.Layout(
        scene=dict(
            xaxis_title='X (km)',
            yaxis_title='Y (km)',
            zaxis_title='Height (m)',
            aspectmode='manual',
            aspectratio=dict(x=1, y=1, z=0.3)
        ),
        title=f'3D City Model - {zoning} Zone',
        legend=dict(x=0, y=1, traceorder='normal', orientation='h'),
    )

    # Create figure
    fig = go.Figure(data=[trace_buildings] + traces_roads, layout=layout)

    # Generate explanation in markup language
    explanation = f"""
    ## 3D City Model Explanation

    This 3D model represents a city layout for a **{zoning}** zone with the following characteristics:

    - **Land Area**: {land_area} sq km
    - **Number of Buildings**: {num_buildings}
    - **Building Heights**: Ranging from {building_type['height_range'][0]} to {building_type['height_range'][1]} meters

    ### Key Features:
    1. **Buildings**: Represented by {building_type['color']} squares, with size proportional to height.
    2. **Roads**: Gray lines forming a grid pattern across the city.
    3. **Zoning**: The model reflects a {zoning.lower()} zone, influencing building types and heights.

    ### Interpretation:
    - Taller buildings indicate areas of higher density or importance within the {zoning.lower()} zone.
    - The grid road system provides a structured layout for efficient transportation.
    - The distribution of buildings showcases the urban planning approach for this {zoning.lower()} area.

    This model serves as a visual representation of the city's layout and can be used to analyze spatial relationships, 
    density patterns, and overall urban structure.
    """

    return fig, explanation

def analyze_sustainability(plan, goals):
    # This is a simplified sustainability analysis
    # In a real application, this would involve more complex NLP and scoring algorithms
    
    score = 0
    breakdown = {}
    
    for goal in goals:
        if goal.lower() in plan.lower():
            score += 25
            breakdown[goal] = 25
        else:
            breakdown[goal] = 0
    
    return score, breakdown

def optimize_traffic_flow(plan):
    # This is a simplified traffic flow optimization
    # In a real application, this would involve complex simulations and algorithms
    
    # Generate random traffic flow data
    hours = list(range(24))
    traffic_volume = np.random.randint(100, 1000, 24)
    
    # Create line plot
    trace = go.Scatter(x=hours, y=traffic_volume, mode='lines+markers')
    
    # Create layout
    layout = go.Layout(
        title='24-Hour Traffic Flow Projection',
        xaxis_title='Hour of Day',
        yaxis_title='Traffic Volume'
    )
    
    # Create figure
    fig = go.Figure(data=[trace], layout=layout)
    
    return fig