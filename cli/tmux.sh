tmux kill-session

session="motorflex"

tmux source-file ./tmux.conf

tmux new-session -d -s $session

tmux rename-window -t 0 'Terminal'
tmux send-keys -t 'Terminal' 'docker attach motorflex-terminal-1' C-m

tmux new-window -t $session:1 -n 'api'
tmux send-keys -t 'api' 'docker logs -f motorflex-api-1' C-m

tmux new-window -t $session:2 -n 'web'
tmux send-keys -t 'web' 'docker logs -f motorflex-web-1' C-m

tmux new-window -t $session:3 -n 'gql-codegen'
tmux send-keys -t 'gql-codegen' 'docker logs -f motorflex-gqlcodegen-1' C-m

tmux new-window -t $session:4 -n 'firebase'
tmux send-keys -t 'firebase' 'docker logs -f motorflex-firebase-1' C-m

tmux attach-session -t $SESSION:0
