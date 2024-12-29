#!/bin/bash

# Define project directory
PROJECT_DIR="client"

# Function to display usage
usage() {
  echo "Usage: $0 {-i|-d}"
  echo "  -c    Run client only commands"
  echo "  -b    Run bacakend only"
  echo "  -i    Install dependencies"
  echo "  -s    Run development server"
  exit 1
}

# Check if the script is being run from the correct directory
if [ ! -d "$PROJECT_DIR" ]; then
  echo "Error: Project directory '$PROJECT_DIR' not found!"
  exit 1
fi

# Navigate to the project directory
cd "$PROJECT_DIR" || exit

# Check for command-line arguments
if [ "$#" -ne 1 ]; then
  usage
fi

# Handle the installation and development options
case "$1" in
  -i)
    echo "Installing dependencies..."
    npm install
    ;;
  -s)
    echo "Running development server..."
    npm run dev -- --host 
    ;;
  *)
    usage
    ;;
esac

# End of script


# #!/bin/bash

# # Define project directories
# CLIENT_DIR="client"
# BACKEND_DIR="api"

# # Function to display usage
# usage() {
#   echo "Usage: $0 {-c|-b} {-i|-s}"
#   echo "  -c    Run client only commands (frontend)"
#   echo "  -b    Run backend only commands (Rails)"
#   echo "  -i    Install dependencies"
#   echo "  -s    Run development server"
#   echo "If no -c or -b is specified, both frontend and backend commands are run."
#   exit 1
# }

# # Check if the script is run with enough arguments
# if [ "$#" -lt 1 ]; then
#   usage
# fi

# # Parse options
# TARGET=""
# ACTION=""

# while getopts ":cbi:s" opt; do
#   case "$opt" in
#     c) TARGET="client" ;;
#     b) TARGET="backend" ;;
#     i) ACTION="install" ;;
#     s) ACTION="serve" ;;
#     *) usage ;;
#   esac
# done

# # Function to run client commands
# run_client() {
#   cd "$CLIENT_DIR" || exit
#   if [ "$ACTION" == "install" ]; then
#     echo "Installing dependencies for frontend..."
#     npm install
#   elif [ "$ACTION" == "serve" ]; then
#     echo "Running development server for frontend..."
#     npm run dev
#   else
#     usage
#   fi
#   cd - > /dev/null || exit
# }

# # Function to run backend commands
# run_backend() {
#   cd "$BACKEND_DIR" || exit
#   if [ "$ACTION" == "install" ]; then
#     echo "Installing dependencies for backend..."
#     bundle install
#   elif [ "$ACTION" == "serve" ]; then
#     echo "Running development server for backend..."
#     rails server
#   else
#     usage
#   fi
#   cd - > /dev/null || exit
# }

# # Handle both frontend and backend if neither -c nor -b is specified
# if [ -z "$TARGET" ]; then
#   if [ "$ACTION" == "install" ]; then
#     echo "Installing dependencies for both frontend and backend..."
#     run_client
#     run_backend
#   elif [ "$ACTION" == "serve" ]; then
#     echo "Running development servers for both frontend and backend..."
#     run_backend
#     run_client
#   else
#     usage
#   fi
# else
#   if [ "$TARGET" == "client" ]; then
#     run_client
#   elif [ "$TARGET" == "backend" ]; then
#     run_backend
#   else
#     usage
#   fi
# fi
