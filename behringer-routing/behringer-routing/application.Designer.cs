namespace behringer_routing
{
    partial class application
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle9 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle10 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle11 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle12 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabDevices = new System.Windows.Forms.TabPage();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btnAddStageBox = new System.Windows.Forms.Button();
            this.dataGridStageBoxes = new System.Windows.Forms.DataGridView();
            this.btnRemoveStageBox = new System.Windows.Forms.Button();
            this.groupBoxDevice = new System.Windows.Forms.GroupBox();
            this.buttonAddMixer = new System.Windows.Forms.Button();
            this.dataGridMixers = new System.Windows.Forms.DataGridView();
            this.buttonRemoveMixer = new System.Windows.Forms.Button();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.saveToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.helpToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.infoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.tabControl1.SuspendLayout();
            this.tabDevices.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridStageBoxes)).BeginInit();
            this.groupBoxDevice.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridMixers)).BeginInit();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tabControl1
            // 
            this.tabControl1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tabControl1.Controls.Add(this.tabDevices);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Location = new System.Drawing.Point(0, 27);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(884, 484);
            this.tabControl1.TabIndex = 0;
            // 
            // tabDevices
            // 
            this.tabDevices.Controls.Add(this.groupBox1);
            this.tabDevices.Controls.Add(this.groupBoxDevice);
            this.tabDevices.Location = new System.Drawing.Point(4, 22);
            this.tabDevices.Name = "tabDevices";
            this.tabDevices.Padding = new System.Windows.Forms.Padding(3);
            this.tabDevices.Size = new System.Drawing.Size(876, 458);
            this.tabDevices.TabIndex = 0;
            this.tabDevices.Text = "Devices";
            // 
            // groupBox1
            // 
            this.groupBox1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBox1.Controls.Add(this.btnAddStageBox);
            this.groupBox1.Controls.Add(this.dataGridStageBoxes);
            this.groupBox1.Controls.Add(this.btnRemoveStageBox);
            this.groupBox1.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(7, 183);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(2);
            this.groupBox1.Size = new System.Drawing.Size(862, 268);
            this.groupBox1.TabIndex = 3;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Stage Boxes";
            // 
            // btnAddStageBox
            // 
            this.btnAddStageBox.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnAddStageBox.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnAddStageBox.Location = new System.Drawing.Point(796, 244);
            this.btnAddStageBox.Margin = new System.Windows.Forms.Padding(2);
            this.btnAddStageBox.Name = "btnAddStageBox";
            this.btnAddStageBox.Size = new System.Drawing.Size(59, 20);
            this.btnAddStageBox.TabIndex = 1;
            this.btnAddStageBox.Text = "&Add";
            this.btnAddStageBox.UseVisualStyleBackColor = true;
            this.btnAddStageBox.Click += new System.EventHandler(this.btnAddStageBox_Click);
            // 
            // dataGridStageBoxes
            // 
            this.dataGridStageBoxes.AllowUserToAddRows = false;
            this.dataGridStageBoxes.AllowUserToDeleteRows = false;
            this.dataGridStageBoxes.AllowUserToResizeRows = false;
            this.dataGridStageBoxes.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridStageBoxes.BackgroundColor = System.Drawing.SystemColors.Control;
            this.dataGridStageBoxes.BorderStyle = System.Windows.Forms.BorderStyle.None;
            dataGridViewCellStyle9.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle9.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            dataGridViewCellStyle9.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle9.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle9.SelectionBackColor = System.Drawing.Color.DarkBlue;
            dataGridViewCellStyle9.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle9.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dataGridStageBoxes.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle9;
            this.dataGridStageBoxes.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle10.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle10.BackColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle10.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle10.ForeColor = System.Drawing.SystemColors.ControlText;
            dataGridViewCellStyle10.SelectionBackColor = System.Drawing.Color.RoyalBlue;
            dataGridViewCellStyle10.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle10.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dataGridStageBoxes.DefaultCellStyle = dataGridViewCellStyle10;
            this.dataGridStageBoxes.GridColor = System.Drawing.SystemColors.ControlLight;
            this.dataGridStageBoxes.Location = new System.Drawing.Point(9, 17);
            this.dataGridStageBoxes.Name = "dataGridStageBoxes";
            this.dataGridStageBoxes.RowHeadersVisible = false;
            this.dataGridStageBoxes.RowHeadersWidth = 72;
            this.dataGridStageBoxes.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridStageBoxes.Size = new System.Drawing.Size(846, 222);
            this.dataGridStageBoxes.TabIndex = 0;
            this.dataGridStageBoxes.CellEndEdit += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridStageBoxes_CellEndEdit);
            // 
            // btnRemoveStageBox
            // 
            this.btnRemoveStageBox.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.btnRemoveStageBox.ForeColor = System.Drawing.SystemColors.ControlText;
            this.btnRemoveStageBox.Location = new System.Drawing.Point(732, 244);
            this.btnRemoveStageBox.Margin = new System.Windows.Forms.Padding(2);
            this.btnRemoveStageBox.Name = "btnRemoveStageBox";
            this.btnRemoveStageBox.Size = new System.Drawing.Size(59, 20);
            this.btnRemoveStageBox.TabIndex = 1;
            this.btnRemoveStageBox.Text = "&Remove";
            this.btnRemoveStageBox.UseVisualStyleBackColor = true;
            this.btnRemoveStageBox.Click += new System.EventHandler(this.btnRemoveStageBox_Click);
            // 
            // groupBoxDevice
            // 
            this.groupBoxDevice.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBoxDevice.Controls.Add(this.buttonAddMixer);
            this.groupBoxDevice.Controls.Add(this.dataGridMixers);
            this.groupBoxDevice.Controls.Add(this.buttonRemoveMixer);
            this.groupBoxDevice.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBoxDevice.Location = new System.Drawing.Point(7, 5);
            this.groupBoxDevice.Margin = new System.Windows.Forms.Padding(2);
            this.groupBoxDevice.Name = "groupBoxDevice";
            this.groupBoxDevice.Padding = new System.Windows.Forms.Padding(2);
            this.groupBoxDevice.Size = new System.Drawing.Size(862, 174);
            this.groupBoxDevice.TabIndex = 2;
            this.groupBoxDevice.TabStop = false;
            this.groupBoxDevice.Text = "Mixers";
            // 
            // buttonAddMixer
            // 
            this.buttonAddMixer.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonAddMixer.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonAddMixer.Location = new System.Drawing.Point(796, 150);
            this.buttonAddMixer.Margin = new System.Windows.Forms.Padding(2);
            this.buttonAddMixer.Name = "buttonAddMixer";
            this.buttonAddMixer.Size = new System.Drawing.Size(59, 20);
            this.buttonAddMixer.TabIndex = 1;
            this.buttonAddMixer.Text = "&Add";
            this.buttonAddMixer.UseVisualStyleBackColor = true;
            this.buttonAddMixer.Click += new System.EventHandler(this.buttonAddMixer_Click);
            // 
            // dataGridMixers
            // 
            this.dataGridMixers.AllowUserToAddRows = false;
            this.dataGridMixers.AllowUserToDeleteRows = false;
            this.dataGridMixers.AllowUserToResizeRows = false;
            this.dataGridMixers.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridMixers.BackgroundColor = System.Drawing.SystemColors.Control;
            this.dataGridMixers.BorderStyle = System.Windows.Forms.BorderStyle.None;
            dataGridViewCellStyle11.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle11.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            dataGridViewCellStyle11.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle11.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle11.SelectionBackColor = System.Drawing.Color.DarkBlue;
            dataGridViewCellStyle11.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle11.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dataGridMixers.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle11;
            this.dataGridMixers.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle12.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle12.BackColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle12.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle12.ForeColor = System.Drawing.SystemColors.ControlText;
            dataGridViewCellStyle12.SelectionBackColor = System.Drawing.Color.RoyalBlue;
            dataGridViewCellStyle12.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle12.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dataGridMixers.DefaultCellStyle = dataGridViewCellStyle12;
            this.dataGridMixers.GridColor = System.Drawing.SystemColors.ControlLight;
            this.dataGridMixers.Location = new System.Drawing.Point(9, 17);
            this.dataGridMixers.Name = "dataGridMixers";
            this.dataGridMixers.RowHeadersVisible = false;
            this.dataGridMixers.RowHeadersWidth = 72;
            this.dataGridMixers.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridMixers.Size = new System.Drawing.Size(846, 128);
            this.dataGridMixers.TabIndex = 0;
            this.dataGridMixers.CellEndEdit += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridMixers_CellEndEdit);
            // 
            // buttonRemoveMixer
            // 
            this.buttonRemoveMixer.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonRemoveMixer.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonRemoveMixer.Location = new System.Drawing.Point(733, 150);
            this.buttonRemoveMixer.Margin = new System.Windows.Forms.Padding(2);
            this.buttonRemoveMixer.Name = "buttonRemoveMixer";
            this.buttonRemoveMixer.Size = new System.Drawing.Size(59, 20);
            this.buttonRemoveMixer.TabIndex = 1;
            this.buttonRemoveMixer.Text = "&Remove";
            this.buttonRemoveMixer.UseVisualStyleBackColor = true;
            this.buttonRemoveMixer.Click += new System.EventHandler(this.buttonRemoveMixer_Click);
            // 
            // tabPage2
            // 
            this.tabPage2.Location = new System.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(876, 458);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "tabPage2";
            // 
            // menuStrip1
            // 
            this.menuStrip1.ImageScalingSize = new System.Drawing.Size(28, 28);
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.helpToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(884, 24);
            this.menuStrip1.TabIndex = 1;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.saveToolStripMenuItem});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "&File";
            // 
            // saveToolStripMenuItem
            // 
            this.saveToolStripMenuItem.Name = "saveToolStripMenuItem";
            this.saveToolStripMenuItem.Size = new System.Drawing.Size(98, 22);
            this.saveToolStripMenuItem.Text = "&Save";
            this.saveToolStripMenuItem.Click += new System.EventHandler(this.saveToolStripMenuItem_Click);
            // 
            // helpToolStripMenuItem
            // 
            this.helpToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.infoToolStripMenuItem});
            this.helpToolStripMenuItem.Name = "helpToolStripMenuItem";
            this.helpToolStripMenuItem.Size = new System.Drawing.Size(44, 20);
            this.helpToolStripMenuItem.Text = "&Help";
            // 
            // infoToolStripMenuItem
            // 
            this.infoToolStripMenuItem.Name = "infoToolStripMenuItem";
            this.infoToolStripMenuItem.Size = new System.Drawing.Size(107, 22);
            this.infoToolStripMenuItem.Text = "&About";
            // 
            // application
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(884, 511);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "application";
            this.Text = "application";
            this.Load += new System.EventHandler(this.application_Load);
            this.Shown += new System.EventHandler(this.application_Shown);
            this.tabControl1.ResumeLayout(false);
            this.tabDevices.ResumeLayout(false);
            this.groupBox1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridStageBoxes)).EndInit();
            this.groupBoxDevice.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridMixers)).EndInit();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabDevices;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem saveToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem helpToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem infoToolStripMenuItem;
        private System.Windows.Forms.DataGridView dataGridMixers;
        private System.Windows.Forms.Button buttonRemoveMixer;
        private System.Windows.Forms.Button buttonAddMixer;
        private System.Windows.Forms.GroupBox groupBoxDevice;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btnAddStageBox;
        private System.Windows.Forms.DataGridView dataGridStageBoxes;
        private System.Windows.Forms.Button btnRemoveStageBox;
    }
}